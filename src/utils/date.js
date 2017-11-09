import React from "react";
import { translate } from "utils/i18n";
import { FormattedDate } from "react-intl";

export const getWeek = date => {
  /*Code removed*/
};

export const getWeekYear = date => {
  /*Code removed*/
};

export const getIsoWeek = date => `${getWeekYear(date)}-W${getWeek(date)}`;

export const getMonday = d => {
  /*Code removed*/
};

export const formatTime = timeDate => {
  const hours = `0${timeDate.getHours()}`.slice(-2);
  const mins = `0${timeDate.getMinutes()}`.slice(-2);
  return `${hours}:${mins}`;
};

export const formatDate = date => {
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${date.getFullYear()}-${month}-${day}`;
};

export const RelativeDate = ({ date }) => {
  const time = new Date();
  const today = formatDate(time);
  time.setDate(time.getDate() + 1);
  const tomorrow = formatDate(time);

  return date === today ? (
    translate({ id: "global.today" })
  ) : date === tomorrow ? (
    translate({ id: "global.tomorrow" })
  ) : (
    <FormattedDate
      value={new Date(date)}
      weekday="long"
      day="numeric"
      month="long"
    />
  );
};
