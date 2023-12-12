import React from 'react'
import './OwnerInterface.css'
import AgentNavbar from './AgentNavbar'

export default function NewPost() {
  return (
    <div>
       <AgentNavbar/>
    <div class=" container mt-4" style={{marginBottom:'80px'}}>
    <h3 class='gridhead'>POST YOUR LOAD DETAILS</h3>
    <form>

        <div class="row mt-5 ms-3 me-3">
            <div class="col-md-6">
                <label for="field1" class="form-label">From <span className='text-danger'>*</span></label>
                <input type="text" class="form-control" id="field1" name="field1" required placeholder='From Location'/>
            </div>

            <div class="col-md-6">
                <label for="field2" class="form-label">To <span className='text-danger'>*</span> </label>
                <input type="text" class="form-control" id="field2" name="field2" required placeholder='To Location'/>
            </div>
        </div>
        <div class="row mt-3 ms-3 me-3">
        <div class="col-md-6">
                <label for="field4" class="form-label">From Sub Location <span className='text-danger'>*</span></label>
                <select class="form-select" id="field3" name="field3" required>
                <option value="option"> Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option1">Option 3</option>
                    <option value="option2">Option 4</option>
                    
                </select>
            </div>

            <div class="col-md-6">
                <label for="field4" class="form-label">To Sub Location<span className='text-danger'>*</span></label>
                <select class="form-select" id="field4" name="field4" required>
                <option value="option"> Select</option>
                   <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option1">Option 3</option>
                    <option value="option2">Option 4</option> 
                </select>
            </div>
        </div>
        <div className='row mt-3 ms-3 me-3'>
         
          <div class="col-md-6">
          <label for="field1" class="form-label">Distance In KMs<span className='text-danger'>*</span></label>
                <input type="text" class="form-control" id="field1" name="field1" required placeholder=''/>
            </div>
            <div className='col-md-6'>
           <label for="field4" class="form-label">Scheduled Date <span className='text-danger'>*</span></label>
             <input type="date" class="form-control" id="field4" name="field4" required style={{textTransform:'uppercase'}} />
          </div>
        </div>

        <div class="row mt-3 ms-3 me-3">
        <div class="col-md-6">
                <label for="field4" class="form-label">Material Type <span className='text-danger'>*</span></label>
                <select class="form-select" id="field3" name="field3" required>
                <option value="option"> Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option1">Option 3</option>
                    <option value="option2">Option 4</option>
                    
                </select>
            </div>

            <div class="col-md-6">
                <label for="field4" class="form-label">Weight <span className='text-danger'>*</span></label>
                <input type="text" class="form-control" id="field4" name="field1" required placeholder=''/>
            </div>
        </div>

        <div class="row mt-3 ms-3 me-3">
        <div class="col-md-6">
                <label for="field4" class="form-label">Truck  Wheels - Axles <span className='text-danger'>*</span></label>
                <select class="form-select" id="field3" name="field3" required>
                <option value="option"> Select</option>
              <option value="4 Wheels - 2 Axles">4 Wheels - 2 Axles</option>
              <option value="6 Wheels - 2 Axles">6 Wheels - 2 Axles</option>
              <option value="10 Wheels - 3 Axles">10 Wheels - 3 Axles</option>
              <option value="12 Wheels - 4 Axles">12 Wheels - 4 Axles</option>
              <option value="14 Wheels - 5 Axles">14 Wheels - 5 Axles</option>
              <option value="16 Wheels - 5 Axles">16 Wheels - 5 Axles</option>  
                </select>
            </div>

            <div class="col-md-6">
                <label for="field4" class="form-label">No.of Trucks <span className='text-danger'>*</span></label>
                <select class="form-select" id="field4" name="field4" required>
                <option value="option"> Select</option>
                   <option value="option1"> 1</option>
                    <option value="option2">2</option>
                    <option value="option1"> 3</option>
                    <option value="option2"> 4</option> 
                </select>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12 mt-3"  >
                <button type="submit" class="btn btn-primary" style={{width:'200px',marginLeft:'450px'}}>Submit</button>
            </div>
        </div>

    </form>
  </div> 
  </div>
  )
}
