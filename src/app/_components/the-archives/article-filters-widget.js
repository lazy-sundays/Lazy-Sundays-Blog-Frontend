import Construction from "../construction";


export default function ArticleFiltersWidget({ filters }) {

    return (
        <div className="p-2 mb-4 rounded-md flex flex-col bg-bgsecondary">
            <h2 className="text-2xl uppercase font-bold">
                Refine Results
            </h2>
            <div className="mx-2">
                <Construction />
            </div>
        </div>
    );
}