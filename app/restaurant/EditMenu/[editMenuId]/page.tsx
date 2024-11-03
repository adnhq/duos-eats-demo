import React from "react";

type Props = {
  params: {
    editMenuId: string;
  };
};

export default function Page({ params }: Props) {
  return <div>Should Edit {params.editMenuId}</div>;
}
