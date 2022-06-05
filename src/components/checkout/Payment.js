import { React, useState } from 'react';
import PaystackPop from '@paystack/inline-js';

const Payment = ({
    user,
    checkoutData,
    handleBackStep,
    handleNextStep,
    handleCheckout
  }) => {

    const [psReference, setPsReference] = useState("");
    

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

    const paystackPay = (e) => {
        e.preventDefault()
        console.log(checkoutData)
        
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: "pk_test_0e824463d20818c6550d20220c1cffb88aac11e6",
            amount: checkoutData.live.subtotal.raw * 100,
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
                      name: "stander",
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
                  

                let message = `Successfull Reference ${transaction.reference}`
                console.log(paystack);
                console.log(orderData);
                handleCheckout(checkoutData.id, orderData);
                handleNextStep(e, "confirmation");
            },
            onCancel(){
                console.log("Transaction canceled.")
            }
        })

    }


    return (
        <>
             <button onClick={paystackPay}>
                  Pay {checkoutData.live.subtotal.formatted_with_symbol}
            </button>

            <button
                  onClick={(e) => handleBackStep(e, "order-details")}
                >
                  Back
            </button>
        </>
    )
};



export default Payment;