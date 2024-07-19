import { useEffect, useState } from "react";
import usersService from "../../services/usersService";
import "./index.scss";

const Leaderboard = () => {
  const [topFive, setTopFive] = useState([]);

  const fetchTopFive = async () => {
    const users = await usersService.getTopFive();
    setTopFive(users);
  };

  useEffect(() => {
    fetchTopFive();
  }, []);

  return (
    <>
      <div className="background">
        <div className="bg-image-login"></div>
        <div className="bg-image-login"></div>
        <div className="bg-image-login"></div>
      </div>
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <td></td>
            <td>Username</td>
            <td>Score</td>
          </tr>
        </thead>
        <tbody>
          {topFive ? (
            topFive.map((user, index) => {
              let userRank = "";
              if (index === 0 || index === 1 || index === 2) {
                userRank = `rank-${index + 1}`;
              }

              return (
                <tr key={user.id}>
                  <td className={`rank ${userRank}`}>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.score}</td>
                </tr>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Leaderboard;
