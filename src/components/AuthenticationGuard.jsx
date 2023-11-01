/* eslint-disable react/prop-types */

import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageLoader from "./PageLoader";

export function AuthenticationGuard({ component }) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
}
