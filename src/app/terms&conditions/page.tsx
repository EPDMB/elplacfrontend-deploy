import React from "react"
import Sales from "../../components/MenuTerms/Sales"
import CalendaR from "../../components/Fair/Calendar"
import TimeRange from "../../components/Fair/TimeRange"
import Ticket from "../../components/Fair/Ticket"

function page() {
        return (
            <div>
                <Sales/>
                <CalendaR />
                <TimeRange />
                <Ticket />
            </div>
        )
    }
    
export default page
