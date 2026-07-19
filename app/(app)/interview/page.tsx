"use client";
import { useState } from "react";
import { useRoadmap } from "@/hooks/use-roadmap";
import { ProblemTable } from "@/components/problem-table";
const firms = [
  "Amazon",
  "Google",
  "Microsoft",
  "Meta",
  "Adobe",
  "Apple",
  "Netflix",
  "Uber",
  "Atlassian",
  "Oracle",
  "Visa",
  "PayPal",
  "Bloomberg",
  "Goldman Sachs",
  "Walmart",
];
export default function Interview() {
  const { problems } = useRoadmap();
  const [firm, setFirm] = useState("Amazon");
  return (
    <>
      <div className="eyebrow">Company preparation</div>
      <h1 className="title">Interview mode</h1>
      <div className="toolbar">
        <select className="select" value={firm} onChange={(e) => setFirm(e.target.value)}>
          {firms.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>
      <ProblemTable items={problems.filter((p) => p.companies?.includes(firm))} />
    </>
  );
}
