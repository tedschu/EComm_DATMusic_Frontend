// "Add to cart" button
// Function(s) need to update cart state

function AddToCart({product}) {
  //   // Function to create an order (orders table) and add to cart (order_items table)
    async function runAddToCart (product) {
      const response = await fetch(`http://localhost:8080/api/order_items/1/${product}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      console.log(response)
      window.location.reload();
    }

  return (
    <>
      <button onClick={()=>runAddToCart(product)}>+</button>
    </>
  ) 
}

export default AddToCart;
