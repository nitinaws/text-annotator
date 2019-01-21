import React,{Component} from 'react'
import { TokenAnnotator } from 'react-text-annotate'

//const TEXT = `109277792 109277792 RWH 3477400 810976 7792902 01/30/2004 12:00:00 AM ED Discharge Summary Unsigned DIS ~~~ Report Status ~~~ Unsigned ED DISCHARGE NOTIFICATION / SUMMARY SHUFFSKOCKOTESKI, DRU ~~~ MRN ~~~ 3477400 ~~~ Age ~~~ 51y ~~~ REGISTRATION DATE ~~~ 01/30/2004 01:59 AM ~~~ Provider ~~~ KOMAND SILBEDOUETTLAND PRELIMINARY REPORT ~~~ PCP notified by MD ~~~ No - Other explanation ~~~ Benefits Assigned ~~~ N ~~~ Discharge Date / Time ~~~ 01/30/2004 08:28 ~~~ Discharge Status ~~~ Discharged ~~~ Condition on Discharge ~~~ Stable ~~~ Patient States Complaint ~~~ AGGRAVATED / NEEDS APS EVAL ~~~ Diagnosis ~~~ Impulsivity ~~~ 1`
const TEXT = document.querySelector('#document-text').innerText;
const IMAGE_URL = document.querySelector('#encodedImage').innerText;
//const IMAGE_URL = "https://nwsagemaker.s3.amazonaws.com/groundtruth/images/image_1.jpg?AWSAccessKeyId=ASIA6IR6XPBBJC2EUWRL&Expires=1548101594&x-amz-security-token=FQoGZXIvYXdzEF0aDOh5yCdfzCKna8JM1iLtAXRU6RrajZjdJse25XFmC601%2BGU8Io2Q%2FJRNIhA%2FxFMYmzmTWfVIkFqgUtjJHchQaj0L26OPlvnusn3n0mYso7pcqV58YHncl7BFRbHHrpkinduBsuolXROQxawDQo254dNrQeVOTs53Bs6uI3UMff7%2BI3G4dSvmGpro%2Fa3OQePYTs1TOA8yymJW6aKcTVPRnlCBtkKoMkkmoeF51hA%2B4tOXNaLPlsajCOr4L2HB5fJ6m0My6BjJg3zYSNHNGkYgRCUYMT6zYmsdwXfzUYrCVCWa7jA%2F72toWnYxM3DqbnQ0iPpMoCv9EvaAkN6qRCjIs5jiBQ%3D%3D&Signature=qd3A8XaTyWrA4fVq203i1yjOX0Y%3D"
const TAG_COLORS = {
  CONDITION: '#00ffa2',
  DOSAGE: '#84d2ff',
}

const Card = ({children}) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      maxWidth: 500,
      padding: 16,
    }}
  >
    {children}
  </div>
)

class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
            value: [],
            tag: "CONDITION",
            support_claim: "",
            notes: "",
        }
    }

  handleChange = value => {
    this.setState({value});
  }

  handleTagChange = e => {
    this.setState({tag: e.target.value})
  }

  handleYesBtn = e => {
    this.setState({support_claim: "YES"})
  }

  handleNoBtn = e => {
    this.setState({support_claim: "NO"})
  }

  handleNotes = e => {
    this.setState( {notes: e.target.value})
  }

  render() {
    return (
      <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
        <h3 style={{marginTop: 0}}>Text Annotation of Claims</h3>
        <div style={{display: 'flex', marginBottom: 24}}>

          <Card>
              <div class="img_contain">
                <img id="claims_image" name="claims_image" class="page" src={IMAGE_URL} alt="alt"/>
              </div>

          </Card>

          <Card>
            <select onChange={this.handleTagChange} value={this.state.tag}>
                <option value="CONDITION">CONDITION</option>
                <option value="DISCHARGE">DISCHARGE</option>
            </select>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
              renderMark={props => (
                <mark
                  key={props.key}
                  onClick={() => props.onClick({start: props.start, end: props.end})}
                >
                  {props.content} [{props.tag}]
                </mark>
              )}
            />
          </Card>
            <pre hidden={true}>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
          <Card>
              <div class="controls">
                  Notes:<br></br>
                  <textarea onChange={this.handleNotes} value={this.state.notes} name="notes" rows="10"> </textarea>
              </div>
              <div class="controls">
                  Documentation Supporting Claim?<br></br>
                  <button onClick={this.handleYesBtn} class="yb" name="y_0">Yes</button>
                  <button onClick={this.handleNoBtn} class="nb" name="n_0">No</button>
              </div>
          </Card>
        <Card>
          <h4>Current Value</h4>
          <pre hidden={false}>{JSON.stringify(this.state, null, 2)}</pre>
        </Card>
      </div>
    )
  }
}

export default App
