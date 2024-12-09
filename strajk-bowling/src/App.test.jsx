import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { describe, expect } from "vitest";

describe("App", () => {
  it("should navigate and show a text of Inga bokning gjord! and then navigate back", () => {
    const { container } = render(<App />);
    const allImg = screen.getAllByRole("img");
    fireEvent.click(allImg[0]);

    const confirmationText = screen.getByText("Confirmation");
    expect(confirmationText).toBeDefined();
    fireEvent.click(confirmationText);
    expect(screen.getByText("Inga bokning gjord!")).toBeDefined();
    fireEvent.click(allImg[0]);
    const bookingTexts = screen.getAllByText("Booking");
    fireEvent.click(bookingTexts[0]);
    expect(screen.getByText("Number of awesome bowlers")).toBeDefined();
  });
  it("Should book and navigate with right info and be able to navigate and the right info is still showing", async () => {
    const { container } = render(<App />);

    const allInput = container.querySelectorAll(".input__field");
    //ändrar input värden för att trigga fler spelare än tillåtna per bana
    const dateInput = allInput[0];
    fireEvent.change(dateInput, { target: { value: "2024-12-20" } });
    const timeInput = allInput[1];
    fireEvent.change(timeInput, { target: { value: "20:00" } });
    const amoutOfPlayersInput = allInput[2];
    fireEvent.change(amoutOfPlayersInput, { target: { value: 2 } });
    const amountOfLanesInput = allInput[3];
    fireEvent.change(amountOfLanesInput, { target: { value: 1 } });

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[0]);
    const shoesInputs = container.querySelectorAll(".shoes__input");
    shoesInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: 38 } });
    });
    fireEvent.click(buttons[1]);

    await waitFor(() => {}, { timeout: 3000 });
    expect(screen.getByText("Confirmation")).toBeInTheDocument();
    expect(screen.getByText("340 sek")).toBeInTheDocument();
    const allImg = screen.getAllByRole("img");
    fireEvent.click(allImg[0]);
    const bookingTexts = screen.getAllByText("Booking");
    fireEvent.click(bookingTexts[0]);
    fireEvent.click(allImg[0]);
    const confirmationText = screen.getByText("Confirmation");
    fireEvent.click(confirmationText);
    expect(screen.getByText("340 sek")).toBeInTheDocument();
    screen.debug();
  });
});
