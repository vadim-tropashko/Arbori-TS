incorrect "syntax" 123 
--% 
& (

CREATE TABLE hash_products
    ( product_id          NUMBER(6)
    , product_name        VARCHAR2(50)
    , CONSTRAINT          pk_product_id PRIMARY KEY (product_id)
 ) )
 STORE IN (example); 
 
CREATE TABLE sales_quota
    ( product_id          NUMBER(6)
    , customer_name       VARCHAR2(50)  
    , order_qty           NUMBER(6)
  ,CONSTRAINT u_product_id UNIQUE(product_id)
 ); 
 
 1 more 'incorrect' syntax 