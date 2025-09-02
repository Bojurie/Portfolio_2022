export const paginate = async (query, { page = 1, limit = 12 } = {}) => {
  page = Number(page) || 1;
  limit = Math.min(Number(limit) || 12, 100);
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    query.skip(skip).limit(limit),
    query.model.countDocuments(query.getQuery()),
  ]);
  const meta = { page, limit, total, pages: Math.ceil(total / limit) };
  return [items, meta];
};
