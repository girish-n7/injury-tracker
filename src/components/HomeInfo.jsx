import { useState } from "react";
import injuredPerson from "../assets/injured-person.svg";

export default function HomeInfo() {
  //manage state for view more button
  let [more, setMore] = useState(false);

  return (
    <div className="info--container">
      <img className="injured--person" src={injuredPerson} alt=""></img>
      <div className="info--content">
        <strong style={{ fontSize: "1.2rem" }}>
          How to Use the Injury Tracker
        </strong>
        <hr
          style={{
            margin: "10px auto",
            border: "none",
            borderBottom: "1px solid var(--primary)",
          }}
        />
        Welcome to the Injury Tracker, a platform designed to help you monitor
        and manage your injuries. This guide will walk you through the various
        features and functionalities of our website.
        <ol>
          <li>
            <strong>Signup and Login:</strong> If you are a new user, click on
            the <strong>Sign Up</strong> button and fill out the registration
            form to create an account. If you already have an account, click on{" "}
            <strong>Log In</strong> and provide your credentials.
          </li>
          {more && (
            <>
              <li>
                <strong>Submitting an Injury Report:</strong> To report a new
                injury, click on the <strong>Report</strong> button. Fill out
                the injury details, including a name, date, and time. Use the
                body map tool to mark the location of your injury visually.
                Click on the area of your body where the injury is located, and
                the tool will highlight the chosen spot. Click{" "}
                <strong>Submit</strong> to save the report.
              </li>
              <li>
                <strong>Viewing and Editing Reports:</strong> To view a report,
                click on the <strong>View icon</strong> on the card. To edit a
                report, click the <strong>Edit icon</strong> on the card.
                (Please note that you cannot remove existing injuries from a
                report.)
              </li>
              <li>
                <strong>Deleting a Report:</strong> To delete a report, click on
                the <strong>Delete icon</strong> on the card
              </li>
              <li>
                <strong>Search and Filter:</strong> To find specific reports,
                use the search and filter options on the dashboard. You can
                search by injury name. Use filter to filter reports by start and
                end dates of injury or report.
              </li>
              <li>
                <strong>Sort Reports:</strong> Sort the reports by injury date
                time/report date time in ascending/descending order
              </li>
              <li>
                <strong>Contact the Developer:</strong> If you have specific
                inquiries, suggestions, or need technical support, you can reach
                out to the website developer directly. Click on the{" "}
                <strong>Contact developer</strong> button, fill out the contact
                form, including your name, email subject, and a detailed message
                describing your issue or feedback. Our developer will get back
                to you as soon as possible to assist you with your query or
                address your concerns.
              </li>
            </>
          )}
        </ol>
        <button
          className="view--more"
          onClick={() => setMore((prevState) => !prevState)}
        >
          View {more ? "less" : "more"}
        </button>
      </div>
    </div>
  );
}
