insert into products_categories (products_id, categories_id)
SELECT products.id, categories.id
FROM products, categories;