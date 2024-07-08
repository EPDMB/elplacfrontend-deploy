import React from "react"
import Sales from "../../components/MenuTerms/Sales"
import CalendaR from "../../components/Fair/Calendar"
import TimeRange from "../../components/Fair/TimeRange"
import Ticket from "../../components/Fair/Ticket"
import { TableProducts } from "@/components/TableProducts"

function page() {
        return (
            <div>
                <Sales/>
                <TableProducts />
            </div>
        )
    }
    
export default page
