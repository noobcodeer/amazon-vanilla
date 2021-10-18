import {parseRequestUrl} from "../utils";
import {getProduct} from '../api';
import Rating from '../components/Rating';

const ProductScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if(product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <div class='product__screen'>
      <div class='product__screen-back'>
        <div class='product__screen-back-header'>
          <h1>Back to Result</h1>
        </div>
      </div>
      <div class='product__screen-main'>
        <div class='product__screen-main-img'>
          <img src=" ${product.image} " alt='' class='product-main-img'>
        </div>
        <div class='product__screen-main-details'>
          <div class='product-main-details-name'>
            <h1>${product.name}</h1>
          </div>
          <div class='product__screen-main-rating'>
            ${Rating.render({
              value:product.rating,
              text:`${product.numReviews} reviews`
            })}
          </div>
          <div class='product__screen-main-price'>
            <div class='product-main-details-price'>
              <h3>Price:<span class='price'>$${product.price}</span></h3>
            </div>
          </div>
          <div class='product__screen-main-desc'>
            <div class='product-main-details-desc'>
              <h3>Description: ${product.Description}</h3>
            </div>
          </div>
        </div>
        <div class='product__screen-buy'>
        <div class='product__screen-buy-container'>
            <div class='product-buy-container-totalprice'>
              <p>Price: ${product.price} </p>
            </div>
            <div class='product-buy-container-status'>
              <p>Status: ${
                product.countInStock>0 
                ? `<span class='success'>In Stock</span>` 
                :`<span class='error'>Sold Out</span>`
              } </p>
            </div>
            <div class='product-buy-container-add'>
              <div class='product-buy-container-add-card'>
                <p>Add to Cart</p>
              </div>
            </div>
        </div>
      </div>
      </div>
      
    </div>`
  }
};
export default ProductScreen;
