import { formatDate, useDebounceEffect } from "@/utils";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export const CalendarWeek = ({
  weekProps,
}: {
  weekProps: (value: Array<string>) => void;
}) => {
  const today = formatDate(new Date(), "YYYY-MM-DD");
  const [currentWeek, setCurrentWeek] = useState<Array<string>>([]);

  // === get date one year ago ===
  function getAllDatesFromOneYearAgo() {
    const today = new Date();
    today.setDate(today.getDate() + (6 - today.getDay()));
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1); // Go back one year

    const dates = [];

    // Loop through all days from one year ago to today
    for (
      let date = oneYearAgo;
      date <= today;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date)); // Push a copy of the date
    }

    return dates;
  }

  function groupDatesByWeek(dates: Array<Date>) {
    const weeks = [];
    let currentWeek: Array<Date> = [];

    dates.forEach((date: Date) => {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Set to the start of the week (Sunday)

      // If the current week is empty or the week has changed, push the current week to weeks
      if (
        currentWeek.length === 0 ||
        currentWeek[0].getTime() !== weekStart.getTime()
      ) {
        if (currentWeek.length > 0) {
          weeks.push(currentWeek);
        }
        currentWeek = [];
      }

      currentWeek.push(date);
    });

    // Push the last week if it has dates
    if (currentWeek.length > 0) {
      const currentWeekFormat = currentWeek.map((date) =>
        formatDate(date, "YYYY-MM-DD")
      );
      weeks.push(currentWeekFormat);
    }

    return weeks;
  }

  // Get all dates from one year ago to today
  const allDatesFromOneYearAgo = getAllDatesFromOneYearAgo();
  // Group dates by week
  const groupedByWeek = groupDatesByWeek(allDatesFromOneYearAgo);

  interface ScrollSnapChangeEvent extends Event {
    snapTargetInline?: {
      id: string;
    };
  }

  useDebounceEffect(
    () => {
      if (typeof window !== "undefined") {
        const today = new Date();
        document
          .getElementById(formatDate(today, "YYYY-MM-DD"))
          ?.scrollIntoView();

        const snapContainer = document.querySelector(".container-calendar");

        snapContainer?.addEventListener(
          "scrollsnapchange", //saat sudah ganti data & berhenti scroll
          //   "scrollsnapchanging", //saat baru jalan scroll
          (event: ScrollSnapChangeEvent) => {
            const week = event?.snapTargetInline?.id;

            if (week) {
              const parseWeek = JSON.parse(week);
              setCurrentWeek(parseWeek);
            }
          }
        );
      }
    },
    200,
    []
  );

  useEffect(() => {
    if (currentWeek.length > 0) {
      weekProps(currentWeek);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeek]);

  //   console.log(currentWeek);
  return (
    <Box className="max-w-xs bg-white">
      <Box className="border-b border-neutral-300 px-4 py-3">
        {formatDate(currentWeek[3], "MMMM YYYY")}
      </Box>
      <Box className="flex flex-col gap-8 p-4">
        <Box className="flex w-full">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <Box
              key={d}
              className="flex w-[calc(100%_/_7)] justify-center font-semibold"
            >
              <p className="w-6 text-center">{d}</p>
            </Box>
          ))}
        </Box>
        <Box className="container-calendar flex max-w-xs snap-x snap-mandatory gap-4 overflow-x-auto">
          {groupedByWeek.map((week, i) => (
            <Box
              id={JSON.stringify(week)}
              key={i}
              className="flex w-full min-w-[288px] snap-center py-1"
            >
              {week.map((date) => (
                <Box
                  id={date}
                  key={date}
                  className="flex w-[calc(100%_/_7)] justify-center"
                >
                  <p
                    className={`w-6 text-center ${
                      today === date ? "border border-blue-500" : ""
                    }`}
                  >
                    {formatDate(date, "D")}
                  </p>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
