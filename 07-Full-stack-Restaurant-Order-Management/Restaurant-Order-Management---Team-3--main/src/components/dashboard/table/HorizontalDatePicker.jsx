import React, { useState } from "react";
import CalendarIcon from "../../../assets/image/icon/calendar.svg";
import {
    startOfWeek,
    addDays,
    format,
    startOfMonth,
    // getDay,
    // addMonths,
    // subMonths,
} from "date-fns";

const HorizontalDatePicker = () => {
    const [currentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Get start of week from the current month
    const startWeek = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });

    // Generate 7 days (one week row)
    const days = Array.from({ length: 7 }).map((_, i) => addDays(startWeek, i));

    // const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    // const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <div className="w-100 d-flex flex-column align-items-center">
            {/* Dates Row */}
            <div className="d-flex align-items-center  bg-white rounded-2 flex-wrap flex-lg-nowrap border">
                {/* Calendar icon */}
                <div className="w-60 square d-flex justify-content-center align-items-center cursor-pointer">
                    <img src={CalendarIcon} alt="" />
                </div>

                {/* Days */}
                {days.map((day) => {
                    const isSelected =
                        format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

                    return (
                        <div
                            key={day}
                            onClick={() => setSelectedDate(day)}
                            role="button"
                            className={`d-flex flex-column border justify-content-center align-items-center w-60 square  
                ${isSelected
                                    ? "border-2 border-primary text-primary"
                                    : "  text-neutral-700"
                                }`}
                        >
                            <span className="text-xs">{format(day, "EEE")}</span>
                            <span className="fw-medium">{format(day, "d")}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HorizontalDatePicker;