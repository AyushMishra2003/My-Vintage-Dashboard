import React from "react";
import { useParams } from "react-router-dom";
import { useGetChildByTitleQuery } from "@/Rtk/dynamicApi";

const ChildManager = () => {
  const { pageName, sectionTitle } = useParams();
  const { data: children, isLoading } = useGetChildByTitleQuery({ pageName, childTitle: sectionTitle });

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Children of "{sectionTitle}" in "{pageName}"
      </h1>
      <ul className="mt-4 space-y-2">
        {children?.map((child) => (
          <li key={child._id} className="border p-2 rounded">
            <h2 className="font-semibold">{child.title}</h2>
            <p>{child.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChildManager;
