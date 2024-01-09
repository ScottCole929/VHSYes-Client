import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const unitedStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
    "West Virginia", "Wisconsin", "Wyoming"
]

export const Register = () => {
  const [email, setEmail] = useState("admina@straytor.com");
  const [password, setPassword] = useState("straytor");
  const [firstName, setFirstName] = useState("Admina");
  const [lastName, setLastName] = useState("Straytor");
  const [street_address, setStreetAddress] = useState("123 Fake Street");
  const [city, setCity] = useState("Nashville");
  const [state, setState] = useState("Tennessee");
  const [zip_code, setZipCode] = useState("12345")
  const [bio, setBio] = useState("Bio");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/register`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        street_address,
        city,
        state,
        zip_code,
        bio,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo && authInfo.token) {
          localStorage.setItem("rare_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login font-vhs text-2xl">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={() => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleRegister}>
          <h1 className="text-9xl mt-7 mb-3">V-H-YES!</h1>
          <h2 className="text-xl mb-10">Register new account</h2>
          <fieldset className="mb-4">
            <label htmlFor="firstName"> First Name </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(evt) => setFirstName(evt.target.value)}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="lastName"> Last Name </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(evt) => setLastName(evt.target.value)}
              className="form-control"
              placeholder=""
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputEmail"> Email Address </label>
            <input
              type="text"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="Email"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputPassword"> Password </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputStreetAddress"> Street Address </label>
            <input
              type="text"
              id="inputStreetAddress"
              value={street_address}
              onChange={(evt) => setStreetAddress(evt.target.value)}
              className="form-control"
              placeholder="Street Address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputCity"> City </label>
            <input
              type="text"
              id="inputCity"
              value={city}
              onChange={(evt) => setCity(evt.target.value)}
              className="form-control"
              placeholder="City"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputState"> State </label>
            <select
              id="inputState"
              value={state}
              onChange={(evt) => setState(evt.target.value)}
              className="form-control"
              required
            >
                {unitedStates.map((unitedState) => (
                    <option key={unitedState} value={unitedState}>
                        {unitedState}
                    </option>
                ))}
              </select>
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputZipCode"> Zip Code </label>
            <input
              type="text"
              id="inputZipCode"
              value={zip_code}
              onChange={(evt) => setZipCode(evt.target.value)}
              className="form-control"
              placeholder="Zip Code"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-4">
            <label htmlFor="inputBio"> Bio </label>
            <input
              type="text"
              id="inputBio"
              value={bio}
              onChange={(evt) => setBio(evt.target.value)}
              className="form-control"
              placeholder="Bio"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button p-3 rounded-md bg-blue-800 text-blue-100"
            >
              Register
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            to="/login"
          >
            Already have an account?
          </Link>
        </section>
      </div>
    </main>
  );
};
