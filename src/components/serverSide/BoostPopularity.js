
import axios from "axios";

export default async function BoostPopularity(activity) {


await axios.patch("http://localhost:8000/updatePopularity", {
    activity
}).then(r => console.log(r))
}
