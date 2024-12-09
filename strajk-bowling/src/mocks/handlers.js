import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    async ({ request }) => {
      const { when, lanes, people, shoes } = await request.json();

      const lanePrice = 100 * Number(lanes);
      const peoplePrice = 120 * Number(people);
      const sum = lanePrice + peoplePrice;

      return HttpResponse.json({
        active: true,
        id: "STR1540KHLU",
        when,
        lanes,
        people,
        price: sum,
        shoes,
      });
    }
  ),
];
