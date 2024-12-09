import { RouterProvider } from "react-router-dom";
import router from "../router";
import { describe, expect, it, vi } from "vitest";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  findByRole,
} from "@testing-library/react";
import Booking from "./Booking";
import Confirmation from "./Confirmation";

// vi.mock("react-router-dom", async () => ({
//   useLocation: vi.fn(),
// }));

describe("Booking", () => {
  it("should change the inputs on date, time, player and lane ", async () => {
    const { container } = render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
    //hämtar alla inputs och ändrar värde
    const allInput = container.querySelectorAll(".input__field");
    expect(allInput[0]).toBeDefined();
    const dateInput = allInput[0];
    fireEvent.change(dateInput, { target: { value: "2024-12-20" } });
    expect(dateInput.value).toBe("2024-12-20");
    const timeInput = allInput[1];
    fireEvent.change(timeInput, { target: { value: "20:00" } });
    expect(timeInput.value).toBe("20:00");
    const amoutOfPlayersInput = allInput[2];
    expect(amoutOfPlayersInput).toBeDefined();
    fireEvent.change(amoutOfPlayersInput, { target: { value: 2 } });
    expect(amoutOfPlayersInput.value).toBe("2");
    const amountOfLanesInput = allInput[3];
    fireEvent.change(amountOfLanesInput, { target: { value: 1 } });
    expect(amountOfLanesInput.value).toBe("1");
  });
  it("should show warningtext Alla fälten måste vara ifyllda", () => {
    const { container } = render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
    const allInput = container.querySelectorAll(".input__field");
    fireEvent.change(allInput[0], { target: { value: "2024-12-20" } });
    fireEvent.change(allInput[1], { target: { value: "20:00" } });
    fireEvent.change(allInput[2], { target: { value: 1 } });

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);
    expect(screen.getByText("Alla fälten måste vara ifyllda")).toBeDefined();
    screen.debug();
  });
  it("should show warningtext Det får max vara 4 spelare per bana", () => {
    const { container } = render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
    const allInput = container.querySelectorAll(".input__field");
    //ändrar input värden för att trigga fler spelare än tillåtna per bana
    const dateInput = allInput[0];
    fireEvent.change(dateInput, { target: { value: "2024-12-20" } });
    const timeInput = allInput[1];
    fireEvent.change(timeInput, { target: { value: "20:00" } });

    const amoutOfPlayersInput = allInput[2];
    fireEvent.change(amoutOfPlayersInput, { target: { value: 5 } });
    const amountOfLanesInput = allInput[3];
    fireEvent.change(amountOfLanesInput, { target: { value: 1 } });

    const buttons = screen.getAllByRole("button");
    //lägger till fem fält och fyller i skostorlek
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    const shoesInputs = container.querySelectorAll(".shoes__input");
    shoesInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: 40 } });
    });
    //klickar på "bokningsknappen" och får rätt felmeddelande
    fireEvent.click(buttons[1]);
    expect(
      screen.getByText("Det får max vara 4 spelare per bana")
    ).toBeDefined();
  });
  it("should show warning text Alla skor måste vara ifyllda", () => {
    const { container } = render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
    const allInput = container.querySelectorAll(".input__field");
    fireEvent.change(allInput[0], { target: { value: "2024-12-20" } });
    fireEvent.change(allInput[1], { target: { value: "20:00" } });
    fireEvent.change(allInput[2], { target: { value: 1 } });
    fireEvent.change(allInput[3], { target: { value: 1 } });
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(screen.getByText("Alla skor måste vara ifyllda")).toBeDefined();
  });
  it("should show warningtext of Antalet skor måste stämma överens med antal spelare", () => {
    const { container } = render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
    const allInput = container.querySelectorAll(".input__field");
    fireEvent.change(allInput[0], { target: { value: "2024-12-20" } });
    fireEvent.change(allInput[1], { target: { value: "20:00" } });
    fireEvent.change(allInput[2], { target: { value: 2 } });
    fireEvent.change(allInput[3], { target: { value: 1 } });
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    const shoeInput = container.querySelector(".shoes__input");
    fireEvent.change(shoeInput, { target: { value: 40 } });
    expect(shoeInput.value).toBe("40");
    fireEvent.click(buttons[1]);
    expect(
      screen.getByText("Antalet skor måste stämma överens med antal spelare")
    ).toBeDefined();
  });
  it("should allow you to remove shoe or change shoesize", () => {
    const { container } = render(
      <RouterProvider router={router}>
        <Booking />
      </RouterProvider>
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    const shoeInput = container.querySelector(".shoes__input");
    fireEvent.change(shoeInput, { target: { value: 40 } });
    expect(shoeInput.value).toBe("40");
    //ändrar värdet för att se så att det uppdaterar riktigt
    fireEvent.change(shoeInput, { target: { value: 38 } });
    expect(shoeInput.value).toBe("38");
    expect(shoeInput.value).not.toBe("40");
    //tar bort skor och kollar så att fältet för skor försvinner
    const removeShoeBtn = container.querySelector(".shoes__button--small");
    fireEvent.click(removeShoeBtn);
    expect(shoeInput).not.toBeInTheDocument();
  });
});
