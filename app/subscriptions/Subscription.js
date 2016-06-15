export default class Subscription{
  constructor(options = {validated_partner_ids: []}){
    this.exists = options.expires_at
  }
  isValid(){
    if(!this.expires_at){ return false }
    const now = new Date();
    const expires = new Date(this.expires_at);
    return (now <= expires)
  }
  isAvailableFor(partner){
    return this.validated_partner_ids.indexOf(partner.id) < 0
  }
}