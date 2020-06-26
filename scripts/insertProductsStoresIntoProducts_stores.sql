insert into products_stores (products_id, stores_id)
SELECT products.id, stores.id
FROM products, stores;

