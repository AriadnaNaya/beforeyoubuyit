select *
from products
inner join products_stores on products.id = products_id
inner join stores on stores.id = stores_id
order by products.name asc