import JSONEditor from "../../../components-sys/JSONEditor";
import {useEffect, useState} from "react";
import {currentJson, currentPanels, JsonNode} from "../../../data";

export default function () {
  const [json, setJson] = useState<JsonNode[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setJson(currentJson.getJson())
    })
  }, [])

  return (
    <div style={{height: '100%'}}>
      <JSONEditor
        value={json}
        onChange={json => {
          currentPanels.editor?.refreshJson(json)
        }}
      />
    </div>
  )
}
