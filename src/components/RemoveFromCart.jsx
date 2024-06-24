// "Remove from cart" button
// Function(s) need to update cart state

function RemoveFromCart({product}) {
  //   // Function to update order (ex. total_order_revenue in orders table) and cart (order_items table)
    async function runRemoveFromCart(product) {
        const response = await fetch(`http://localhost:8080/api/order_items/1/${product}`,
          {
            method: "DELETE",
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
      <button onClick={()=>runRemoveFromCart(product)}>-</button>
    </>
  );
}

export default RemoveFromCart;
