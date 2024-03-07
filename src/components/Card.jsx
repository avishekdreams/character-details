import { Link } from "react-router-dom";

export default function Card({url, data}) {
  return (
    <Link to={`/${url}/${data.id}`} key={data.id}>
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-40">
          <img src={data.image} alt={data.name} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 ">
              {data.name}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">{data.gender}</p>
        </div>
      </div>
    </Link>
  )
}