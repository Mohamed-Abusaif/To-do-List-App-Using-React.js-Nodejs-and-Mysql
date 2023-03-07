import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react";
import Listitem from "./components/Listitem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authtoken = cookies.Authtoken
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);
  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (authtoken) {
      getData();
    }
  }, [authtoken]);

  console.log(tasks);

  //sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="app">
      {!authtoken && <Auth></Auth>}
      {authtoken && (
        <>
          <ListHeader
            listName={"Holiday Tick List!"}
            getData={getData}
          ></ListHeader>
          {sortedTasks?.map((task) => (
            <Listitem key={task.id} task={task} getData={getData}></Listitem>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
