import ErrorPage from "../../components/ErrorPage"
import bugsImage from "../../assets/images/bugs.svg"
export default () => {
    return <ErrorPage code={"500"} message={["Sorry for the glitch", "Were working on getting it fixed."]}  asset={bugsImage} />
}
