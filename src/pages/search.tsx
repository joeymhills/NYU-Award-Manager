import { type NextPage } from "next";

import { api } from "~/utils/api";
import { SignUp, SignInButton, SignUpButton, SignOutButton, SignIn, useUser } from "@clerk/nextjs";

const Home: NextPage = () => {

const { data } = api.accolades.getAll.useQuery();


return(
<div>
    {data?.map((accolades) => (
    <div key={accolades.id}>{accolades.accolade}{accolades.institution}{accolades.comments}</div>
    ))}
</div>
);
};