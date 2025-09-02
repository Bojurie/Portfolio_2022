import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiEye, FiFolder, FiStar, FiTrendingUp } from "react-icons/fi";
import axios from "../api/axiosInstance";
import { useAuth } from "../contexts/authContext";
import "./dashboard.scss";

const miniBar = (points = []) => {
  const max = Math.max(1, ...points);
  return points.map((v, i) => ({
    key: i,
    h: Math.round((v / max) * 100),
  }));
};

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  // guard
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: { from: "/admin/dashboard" },
      });
      return;
    }
    if (user?.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get("/dashboard/summary");
        if (!mounted) return;
        setSummary(data || {});
      } catch (e) {
        if (!mounted) return;
        setError(e?.response?.data?.message || "Failed to load dashboard");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const s = summary || {};
    const counts = s.counts || {};
    return [
      {
        label: "Visitors",
        value: counts.visitors ?? counts.pageViews ?? 0,
        icon: <FiEye />,
        trend: s.trend?.visitors ?? 0,
        bars: miniBar(s.series?.visitors ?? []),
      },
      {
        label: "Users",
        value: counts.users ?? 0,
        icon: <FiUsers />,
        trend: s.trend?.users ?? 0,
        bars: miniBar(s.series?.users ?? []),
      },
      {
        label: "Projects",
        value: counts.projects ?? 0,
        icon: <FiFolder />,
        trend: s.trend?.projects ?? 0,
        bars: miniBar(s.series?.projects ?? []),
      },
      {
        label: "Reviews",
        value: counts.reviews ?? 0,
        icon: <FiStar />,
        trend: s.trend?.reviews ?? 0,
        bars: miniBar(s.series?.reviews ?? []),
      },
    ];
  }, [summary]);

  if (loading) {
    return (
      <div className="dash-view">
        <div className="dash-loading">
          <div className="spinner" />
          <p>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dash-view">
        <div className="dash-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-view">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">
            <span className="gradient">Dashboard</span>
          </h1>
          <p className="dash-subtitle">Overview of your portfolio activity</p>
        </div>
        <div className="dash-right">
          <button className="btn btn--secondary">Export</button>
        </div>
      </div>

      <div className="dash-grid">
        {stats.map((card, i) => (
          <motion.div
            key={card.label}
            className="kpi-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <div className="kpi-head">
              <div className="kpi-icon">{card.icon}</div>
              <span className="kpi-label">{card.label}</span>
            </div>
            <div className="kpi-value">{card.value}</div>
            <div className="kpi-foot">
              <span className={`trend ${card.trend >= 0 ? "up" : "down"}`}>
                <FiTrendingUp />
                {Math.abs(card.trend)}%
              </span>
              <div className="bars">
                {card.bars.map((b) => (
                  <span key={b.key} style={{ height: `${b.h}%` }} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dash-panels">
        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="panel-title">Recent Reviews</h3>
          <ul className="review-list">
            {(summary?.recentReviews || []).slice(0, 6).map((r) => (
              <li key={r._id} className="review-item">
                <div className="review-head">
                  <span className="review-name">{r.user?.name || "Anon"}</span>
                  <span className="review-rating">★ {r.rating}</span>
                </div>
                <p className="review-comment">{r.comment}</p>
                <div className="review-meta">
                  <span>
                    {r.targetType}
                    {r.targetTitle ? ` • ${r.targetTitle}` : ""}
                  </span>
                  <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
            {!summary?.recentReviews?.length && (
              <li className="empty">No reviews yet</li>
            )}
          </ul>
        </motion.div>

        <motion.div
          className="panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="panel-title">Top Referrers</h3>
          <ul className="ref-list">
            {(summary?.topReferrers || []).slice(0, 5).map((r) => (
              <li key={r.referrer}>
                <span className="ref-name">
                  {r.referrer || "Direct / None"}
                </span>
                <span className="ref-count">{r.count}</span>
              </li>
            ))}
            {!summary?.topReferrers?.length && (
              <li className="empty">No referrers yet</li>
            )}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
