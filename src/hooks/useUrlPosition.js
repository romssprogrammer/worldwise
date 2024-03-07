import { useSearchParams } from "react-router-dom";
// customHook
export function useUrlPosition() {
  // state logic
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
