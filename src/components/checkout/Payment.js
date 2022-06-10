import React from 'react';
import PaystackPop from '@paystack/inline-js';

const Payment = ({
    user,
    checkoutData,
    handleBackStep,
    handleNextStep,
    handleCheckout
  }) => {
  

    const sanitizedLineItems = (lineItems) => {
        return lineItems.reduce((data, lineItem) => {
          const item = data;
          let variantData = null;
          if (lineItem.selected_options.length) {
            variantData = {
              [lineItem.selected_options[0].group_id]: lineItem.selected_options[0].option_id,
            };
          }
          item[lineItem.id] = {
            quantity: lineItem.quantity,
            variants: variantData,
          };
        return item;
        }, {});
      };

    const orderSubTotal =  checkoutData.live.subtotal.raw + user.shippingOption.price
    const totalAmount =  orderSubTotal * 100;
    const currency = checkoutData.live.currency.symbol;



    const paystackPay = (e) => {
        e.preventDefault()
        
        
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
            amount: totalAmount,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            onSuccess(transaction){

                const orderData = {
                    payment: {
                      gateway: "paystack",
                      paystack: {
                        payment_method_id: "gway_6oLdBVDBm94zoX",
                        reference: transaction.reference,
                      },
                    },
                    shipping: {
                      name: user.firstName + " " + user.lastName,
                      street: user.address,
                      town_city: user.city,
                      county_state: '' + user.shippingSubdivision.code  + '',
                      postal_zip_code: user.postcode,
                      country: '' + user.shippingCountry.code + ''
                    },
                    customer: {
                      firstname: user.firstName,
                      lastname: user.lastName,
                      email: user.email,
                    },
                    line_items: sanitizedLineItems(checkoutData.live.line_items),
                    fulfillment: { shipping_method: user.shippingOption.id  }
                  };
                  

                console.log(orderData);
                handleCheckout(checkoutData.id, orderData);
                handleNextStep(e, "confirmation");
            },
            onCancel(){
                console.log("Transaction has been canceled")
            }
        })

    }


    return (
        <div className='actions'>
            <button
                  onClick={(e) => handleBackStep(e, "order-details")}
                >
                  Back
            </button>

            <button onClick={paystackPay}>
                  Pay {currency}{orderSubTotal.toFixed(2)}
            </button>
        </div>
    )
};



export default Payment;