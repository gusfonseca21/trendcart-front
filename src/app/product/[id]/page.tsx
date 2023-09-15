import React from "react";

interface PageParams {
  id: string;
}

export default function Page(params: PageParams) {
  console.log(params);
  return <div>page</div>;
}
