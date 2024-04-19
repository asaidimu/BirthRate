import ErrorPage from "../../components/ErrorPage"
import lostImage from "../../assets/images/lost.svg"
export default () => {
    return <ErrorPage code={"404"} message={["Oopsie!", "We couldn't find the resource you were looking for."]} asset={lostImage} />
}
