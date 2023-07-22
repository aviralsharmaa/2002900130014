import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const SingleTrain = () => {
  const [TrainData, SetTrainData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const current = location.pathname.substring(1);
    fetch(`http://localhost:5000/api/train/getTrain/${current}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data?.data)
        SetTrainData(data?.data);
      });
  }, []);

  if (!TrainData) {
    return <div>Item not found.</div>;
  }


  return (
    <div className="h-screen bg-slate-400">
      <div className="bg-red-200 inline-flex p-3 m-10">
        <h1>
          {" "}
          <Link to="/">Go Back </Link>{" "}
        </h1>
      </div>

      <div className="flex align-middle text-center justify-center">
        <table class="w-full h-full flex justify-center ">
          <thead>
            <tr className="flex flex-col">
              <th class="text-sm text-left uppercase font-semibold text-grey-darker p-3 bg-gray-200">
                Train Name
              </th>

              <th class="text-sm text-left uppercase font-semibold text-grey-darker p-3 bg-gray-200">
                Train Number
              </th>

              <th class="text-sm text-left uppercase font-semibold text-grey-darker p-3 bg-gray-200">
                Departure Time
              </th>

              <th class="text-sm uppercase font-semibold text-grey-darker p-3 bg-gray-200 text-center">
                Seats Available
              </th>

              <th class="text-sm uppercase font-semibold text-grey-darker p-3 bg-gray-200 text-center">
                Price (Sleeper)
              </th>

              <th class="text-sm uppercase font-semibold text-grey-darker p-3 bg-gray-200 text-center">
                Price (AC)
              </th>
            </tr>
          </thead>

          <tbody class="align-baseline">
            <tr class="group cursor-pointer flex flex-col">
              <td class="text-sm p-3 text-grey-darker p-3 bg-gray-200 text-center">
                {TrainData?.trainName}
              </td>

              <td class="text-sm p-3 border-t border-grey-light whitespace-no-wrap">
                {TrainData?.trainNumber}
              </td>

              <td class="text-sm p-3 border-t border-grey-light whitespace-no-wrap">
                {TrainData?.departureTime?.Hours}:{TrainData?.departureTime?.Minutes}
              </td>

              <td class="text-sm p-3 border-t border-grey-light whitespace-no-wrap ">
                {TrainData?.seatsAvailable?.sleeper + TrainData?.seatsAvailable?.AC}
              </td>

              <td class="text-sm p-3 border-t border-grey-light whitespace-no-wrap ">
                {TrainData?.price?.sleeper}
              </td>

              <td class="text-sm p-3 border-t border-grey-light whitespace-no-wrap ">
                {TrainData?.price?.AC}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleTrain;
