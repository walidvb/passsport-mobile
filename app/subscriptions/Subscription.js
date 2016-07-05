export default class Subscription{
  constructor(options = {validated_partner_ids: []}){
    this.expires_at = new Date(options.expires_at)
    this.validated_partner_ids = options.validated_partner_ids || []
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
  hasValidated(partner){
    return !this.isAvailableFor(partner);
  }
}
