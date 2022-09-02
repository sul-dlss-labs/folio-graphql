import FolioAPI from "./folio-api.js"
import { Patron, Hold, Loan, Charge } from './schema'

export default class PatronsAPI extends FolioAPI {
  private params = new URLSearchParams({
    includeLoans: "true",
    includeHolds: "true",
    includeCharges: "true",
  })

  async getPatron(id: string): Promise<Patron> {
    let patron = await this.get<Patron>(`/patron/account/${encodeURIComponent(id)}?${this.params}`)
    // force add the UUID we queried with because FOLIO doesn't return it...
    patron.id = id
    return patron
  }
}
