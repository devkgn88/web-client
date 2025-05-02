import React from "react";
import { fetchWithAuth } from "./UserContext";

// 상태 Context
const BookingStateContext = React.createContext();
const BookingDispatchContext = React.createContext();

// 상태 reducer
function bookingReducer(state, action) {
  switch (action.type) {
    case "BOOKING_SUCCESS":
      return { ...state, lastBooking: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider (필요 시 사용할 수 있음)
function BookingProvider({ children }) {
  const [state, dispatch] = React.useReducer(bookingReducer, {
    lastBooking: null,
  });

  return (
    <BookingStateContext.Provider value={state}>
      <BookingDispatchContext.Provider value={dispatch}>
        {children}
      </BookingDispatchContext.Provider>
    </BookingStateContext.Provider>
  );
}

// State 조회용 Hook
function useBookingState() {
  const context = React.useContext(BookingStateContext);
  if (context === undefined) {
    throw new Error("useBookingState must be used within a BookingProvider");
  }
  return context;
}

// Dispatch 사용용 Hook
function useBookingDispatch() {
  const context = React.useContext(BookingDispatchContext);
  if (context === undefined) {
    throw new Error("useBookingDispatch must be used within a BookingProvider");
  }
  return context;
}

// 예약 요청 함수
async function createBooking(dispatch, bookingData) {
    try {
      const response = await fetchWithAuth("http://localhost:8082/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error("예약 요청 실패");
      }
  
      const result = await response.json(); // 응답을 JSON으로 파싱
      dispatch({ type: "BOOKING_SUCCESS", payload: result });
      alert("예약 완료!");
    } catch (error) {
      console.error("예약 실패", error);
      alert("예약 실패");
    }
  }
  

export {
  BookingProvider,
  useBookingState,
  useBookingDispatch,
  createBooking,
};
