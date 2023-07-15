import axios from "axios";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { useState } from "react";


const test:NextPage = () => {

    const router = useRouter();
    const queryID = router.query.id
  
    interface FormData {
      institution: string,
      name: string,
      comments: string
      outcome: string
      intSource: string
      extSource: string
      messaging: string
      frequency: string
      notifDate: string
      cmcontact: string
      sourceatr: string
      wherepubint: string
      promotionlim: string
      imgurl1: string
      imgurl2: string
      imgurl3: string
      imgurl4: string
    }  
  
    const [form, setForm] = useState<FormData>({institution: '', name: '', comments: '', outcome: '', intSource: '', extSource: '',
  messaging: '', frequency: '', notifDate: '', cmcontact: '', sourceatr: '', wherepubint: '', promotionlim: '', imgurl1: '', imgurl2: '', imgurl3: '', imgurl4: ''})

    function send(){
    //  fetch(`http://localhost:3000/api/find`, {
    //   method: "POST",
    //   headers: {
    //   "Content-Type": "text/plain",
    //   },
    //   body: "cljchqkvf0002uy6r1fbjptdu",
    //   })
    //   .then(function(response) {
    //   return response.json();}).then(function(accolade) {
    //   setForm({id: accolade.accolade.id, institution: accolade.accolade.institution, name: accolade.accolade.name, comments: accolade.accolade.comments, outcome: accolade.accolade.outcome, intSource: accolade.accolade.intSource, extSource: accolade.accolade.extSource,
    //   messaging: accolade.accolade.messaging, frequency: accolade.accolade.frequency, notifDate: accolade.accolade.notifDate, cmcontact: accolade.accolade.cmcontact, sourceatr: accolade.accolade.sourceatr, wherepubint: accolade.accolade.wherepubint, promotionlim: accolade.accolade.promotionlim,
    //   imgurl1: '', imgurl2: '', imgurl3: '', imgurl4: ''});
    //   })

    axios.post('/api/find', {
      queryID
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    send()
    return(
        <>
        meow
        </>
    )
}
export default test