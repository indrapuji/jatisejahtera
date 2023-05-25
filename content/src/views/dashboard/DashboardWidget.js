import React from 'react';
import {CRow, CCol, CCard, CCardHeader, CCardBody, CCallout, CProgress} from '@coreui/react';
import CIcon from '@coreui/icons-react';

function DashboardWidget({data}) {
  console.log(data);
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>User Count</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs='12' md='12' xl='12'>
                <CRow>
                  <CCol sm='4'>
                    <CCallout color='info'>
                      <small className='text-muted'>Member Register</small>
                      <br />
                      <strong className='h4'>{data.registered}</strong>
                    </CCallout>
                  </CCol>
                  <CCol sm='4'>
                    <CCallout color='success'>
                      <small className='text-muted'>Member Updated</small>
                      <br />
                      <strong className='h4'>{data.updated}</strong>
                    </CCallout>
                  </CCol>
                  <CCol sm='4'>
                    <CCallout color='danger'>
                      <small className='text-muted'>Member Not Update</small>
                      <br />
                      <strong className='h4'>{data.not_update}</strong>
                    </CCallout>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <div className='progress-group mb-4 mt-4'>
              <div className='progress-group-header'>
                <CIcon className='progress-group-icon' name='cil-user' />
                <span className='title'>User Updated</span>
                <span className='ml-auto font-weight-bold'>{Math.round((data.updated / data.registered) * 100)} %</span>
              </div>
              <div className='progress-group-bars'>
                <CProgress
                  className='progress-xs'
                  color='success'
                  value={Math.round((data.updated / data.registered) * 100)}
                />
              </div>
            </div>
            <div className='progress-group mb-5'>
              <div className='progress-group-header'>
                <CIcon className='progress-group-icon' name='cil-user' />
                <span className='title'>User Not Update</span>
                <span className='ml-auto font-weight-bold'>
                  {Math.floor(100 - (data.updated / data.registered) * 100)} %
                </span>
              </div>
              <div className='progress-group-bars'>
                <CProgress
                  className='progress-xs'
                  color='danger'
                  value={Math.floor(100 - (data.updated / data.registered) * 100)}
                />
              </div>
            </div>
            <div className='progress-group'>
              <div className='progress-group-header'>
                <CIcon className='progress-group-icon' name='cil-globe-alt' />
                <span className='title'>Kantor Pusat</span>
                <span className='ml-auto font-weight-bold'>
                  {data.kantorPusat}{' '}
                  <span className='text-muted small'>({(data.kantorPusat / data.registered) * 100}%)</span>
                </span>
              </div>
              <div className='progress-group-bars'>
                <CProgress className='progress-xs' color='success' value={(data.kantorPusat / data.registered) * 100} />
              </div>
            </div>

            <div className='progress-group'>
              <div className='progress-group-header'>
                <CIcon className='progress-group-icon' name='cil-globe-alt' />
                <span className='title'>Jawa Barat</span>
                <span className='ml-auto font-weight-bold'>
                  {data.jawaBarat}{' '}
                  <span className='text-muted small'>({(data.jawaBarat / data.registered) * 100}%)</span>
                </span>
              </div>
              <div className='progress-group-bars'>
                <CProgress className='progress-xs' color='success' value={(data.jawaBarat / data.registered) * 100} />
              </div>
            </div>
            <div className='progress-group'>
              <div className='progress-group-header'>
                <CIcon className='progress-group-icon' name='cil-globe-alt' />
                <span className='title'>Jawa Tengah</span>
                <span className='ml-auto font-weight-bold'>
                  {data.jawaTengah}{' '}
                  <span className='text-muted small'>({(data.jawaTengah / data.registered) * 100}%)</span>
                </span>
              </div>
              <div className='progress-group-bars'>
                <CProgress className='progress-xs' color='success' value={(data.jawaTengah / data.registered) * 100} />
              </div>
            </div>
            <div className='progress-group'>
              <div className='progress-group-header'>
                <CIcon className='progress-group-icon' name='cil-globe-alt' />
                <span className='title'>Jawa Timur</span>
                <span className='ml-auto font-weight-bold'>
                  {data.jawaTimur}{' '}
                  <span className='text-muted small'>({(data.jawaTimur / data.registered) * 100}%)</span>
                </span>
              </div>
              <div className='progress-group-bars'>
                <CProgress className='progress-xs' color='success' value={(data.jawaTimur / data.registered) * 100} />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default DashboardWidget;
