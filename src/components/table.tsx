"use client"
import React from "react";
import { forwardRef } from 'react';

interface Award {
  id: string,
  institution: string,
  name: string,
  serviceLine: string,
  comments: string
  outcome: string
  intSource: string
  extSource: string
  messaging: string
  frequency: string
  notifDate: string
  cmcontact: string
  sourceatr: string
  wherepubint: string
  promotionlim: string
  imgurl1: string
  imgurl2: string
  imgurl3: string
  imgurl4: string
  effectiveDate: string,
  expirationDate: string
}

type AwardList = Award[];

export const Table = forwardRef<HTMLDivElement, AwardList>(( Awards, ref) => {

  return (
  <div ref={ref}>
    <table className="w-200 bg-white">
      <thead>
      <tr>
      <td>Name</td>
      <td>serviceLine</td>
      <td>Location</td>
      <td>Messaging</td>
      </tr>
      </thead>
      <tbody>
      {Awards.map((award: Award) => (
        <tr>
          <td>{award.name}</td>
          <td>{award.serviceLine}</td>
          <td>{award.institution}</td>
          <td>{award.messaging}</td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
  );
});
