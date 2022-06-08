import { useState, useEffect, useRef } from "react";
import {
  Step,
  Paper,
  Stepper,
  StepLabel,
  Container,
  LinearProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import commerce from "../../lib/commerce";
import { renderRelatedComponent } from "./helpers";
import "./style.css";


const steps = ["order-address", "order-details", "order-payment"];

const convertObjectToArray = (countries) =>
  Object.entries(countries || {}).map(([code, name]) => ({ code, name }));

const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Checkout = ({ cart, orderInfo, orderError, handleCheckout }) => {
  const [user, setUser] = useState({
    city: "",
    email: "",
    address: "",
    postCode: "",
    lastName: "",
    firstName: "",
    shippingOption: {},
    shippingOptions: [],
    shippingCountry: {},
    shippingCountries: [],
    shippingSubdivision: {},
    shippingSubdivisions: [],
  });
  const [bookingStep, setBookingStep] = useState("order-address");
  const [checkoutData, setCheckoutData] = useState("");

  const previousShippingCountry = usePreviousState(user.shippingCountry);
  const previousShippingSubdivision = usePreviousState(
    user.shippingSubdivision
  );
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingStep("order-details");
  };

  const handleNextStep = (e, step) => {
    e.preventDefault();
    setBookingStep(step);
  };

  const handleBackStep = (e, step) => {
    e.preventDefault();
    setBookingStep(step);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSelectChange = (e, state) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(e.target);
    if (state === "shippingOptions") {
      setUser({
        ...user,
        [name]: {
          id: value,
        },
      });
    } else {
      setUser({
        ...user,
        [name]: {
          name: user[state].find((country) => country.code === value).name,
          code: value,
        },
      });
    }
  };

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const response = await commerce.checkout.generateToken(
            cart.id,
            {
              type: "cart",
            }
          );
          setCheckoutData(response);
        } catch (error) {
          console.error("Checkout error: ", error);
        }
      };
      generateToken();
    }
  }, [cart, history]);

  useEffect(() => {
    const fetchShippingCountries = async () => {
      const { countries } = await commerce.services.localeListShippingCountries(
        checkoutData.id
      );
      const FormattedCountries = convertObjectToArray(countries);
      setUser({
        ...user,
        shippingCountries: FormattedCountries,
        shippingCountry: FormattedCountries[FormattedCountries.length - 1],
      });
    };
    if (!user.shippingCountries.length && checkoutData.id) {
      fetchShippingCountries();
    }
  }, [user, checkoutData]);

  useEffect(() => {
    const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );

      const shippingSubdivisions = convertObjectToArray(subdivisions);
      setUser({
        ...user,
        shippingSubdivisions,
        shippingSubdivision: shippingSubdivisions[0],
      });
    };

    if (
      (user.shippingCountry.code && !user.shippingSubdivisions.length) ||
      (previousShippingCountry &&
        previousShippingCountry.code !== user.shippingCountry.code)
    )
      fetchSubdivisions(user.shippingCountry.code);
  }, [user, previousShippingCountry]);

  useEffect(() => {
    const fetchShippingOptions = async (
      checkoutDataId,
      country,
      stateProvince = null
    ) => {
      const options = await commerce.checkout.getShippingOptions(
        checkoutDataId,
        {
          country,
          region: stateProvince,
        }
      );
      const optionId = options[0].id;
      const optionPrice = options[0].price.raw;
      const optionName = options[0].description;

     setUser({
        ...user,
        shippingOptions: options,
        shippingOption: { id: optionId, price: optionPrice, name: optionName },
      });
    };

    if (
      (user.shippingSubdivision.code && !user.shippingOptions.length) ||
      (previousShippingSubdivision &&
        previousShippingSubdivision.code !== user.shippingSubdivision.code)
    )
      fetchShippingOptions(
        checkoutData.id,
        user.shippingCountry.code,
        user.shippingSubdivision.code
      );
  }, [
    user,
    checkoutData.id,
    user.shippingCountry.code,
    user.shippingSubdivision,
    previousShippingSubdivision,
  ]);

  if (cart.total_unique_items < 1) {
    return (
      <div className="checkout confirmation">
        <Container>
          <Paper className="paper" elevation={3}>
            <p>You have no items in your cart, start adding some.</p>
            <div>
              <Link to="/shop">
              Go to Shop
              </Link>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }

  if (
    !user.shippingSubdivisions.length ||
    !user.shippingCountries.length ||
    !user.shippingOptions.length ||
    !checkoutData.live
  ) {
    return (
      <div className="checkout">
        <Container>
          <Paper className="paper" elevation={3}>
            <div className="product-spinner">
            <LinearProgress sx={{ color: '#b00000' }} color="inherit" />
            </div>
          </Paper>
        </Container>
      </div>
    );
  }

  return (
    <div className="checkout">
      <Container>
        <Paper className="paper" elevation={3}>
          {bookingStep !== "confirmation" && (
            <Stepper
              className="stepper"
              activeStep={steps.indexOf(bookingStep)}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel className="step-label">{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
          {renderRelatedComponent({
            user,
            orderInfo,
            orderError,
            bookingStep,
            handleChange,
            handleSubmit,
            checkoutData,
            handleBackStep,
            handleNextStep,
            handleCheckout,
            handleSelectChange,
          })}
        </Paper>
      </Container>
    </div>
  );
};

export default Checkout;