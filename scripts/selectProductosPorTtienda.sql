select *
from products
inner join products_stores on products.id = products_id
inner join stores on stores.id = stores_id
inner join categories on categories.id = categories_id
inner join developers on developers.id = developers_id
order by products.name asc