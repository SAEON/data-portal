import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import FlatPage from '../../components/flat-page'
import Footer from '../../components/footer'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()

  return (
    <>
      <FlatPage>
        <Card className={clsx(classes.card)} variant="outlined">
          <CardHeader style={{ textAlign: 'center' }} title="Terms of Service" />

          <CardContent>
            <Typography className={clsx(classes.h2)} variant="h6">
              Website Terms of Use
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              By accessing this SAEON website (“SAEON”), you (the “user”) agree to be bound by the
              terms and conditions set out hereunder. SAEON reserves the right to at any time, in
              its sole discretion, change any of the terms and conditions by posting such changes on
              this website. Such changes shall be effective immediately. By continuing to use this
              website the user shall be deemed to have accepted such changes.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Permitted Use
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              When accessing this website the user may download, view and print any of the content
              from this website for private and non-commercial purposes but may never (1)
              Redistribute, modify, adapt or vary any of the content of this website, (2) Remove any
              copyright or trademark notices from any copies of the content, and (3) Cause any harm
              to this website in any manner whatsoever.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Copyright and Intellectual Property Right
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              This website and all the related pages, including but not limited to content,
              software, code, graphics, designs or other material contained in or electronically
              distributed on this website, are protected by local and international legislation. Any
              unauthorised use whatsoever is strictly prohibited.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Hyperlinks
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Hyperlinks provided on this website to third party websites are provided as is and
              such hyperlinks as well as the content of such third party websites are not under the
              control of SAEON. SAEON does not necessarily agree with, edit or sponsor the content
              of such third party websites and is not responsible for the content thereof.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Framing
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON websites allow some content to be embedded, and these may be included into any
              other website with proper attribution. Framing non-embeddable components are not
              allowed without permission from SAEON.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Technology
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              No person, business entity or website may use any technology to cause any harm
              whatsoever to this website.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Warranties
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON does not give any warranty or representation; express or implied, relating to
              information contained on this website or on any other website linked to this website
              or the accuracy of such information.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON does not warrant that this website or any website to which this website is
              linked or the content thereof is error free.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON does not give any warranty or representation, other than any warranty or
              representation that has been expressly set out in these terms and conditions.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Privacy Policy
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON may request information from the user, which is of a proprietary and
              confidential nature. SAEON shall keep and maintain such information confidential and
              shall not disclose such information to any third party without the prior written
              consent of the user, unless legally obliged to do so.
            </Typography>
            <Typography className={clsx(classes.body)} variant="body2">
              Should an individual be named and contact particulars provided in metadata, either as
              a contact point or a contributor to a published work, SAEON regards that information
              to be in the public domain and (1) allows third-party users and systems to harvest the
              data and use as they see fit, and (2) uses the information to compile statistics,
              reports, and other artefacts that may be useful to its user base.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Please also refer to{' '}
              <Link component={RouterLink} to={'/privacy-policy'}>
                our usage terms regarding data privacy.
              </Link>
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Security Policy
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON may institute legal action against a user who delivers or attempts to deliver
              any damaging code to this website, attempts to gain unauthorised access to any page of
              this website or who causes any harm whatsoever to this website.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Limitation of Liability
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON shall not be liable for any damages, loss or liability of whatsoever nature
              arising from the use or inability to use this website or any other website linked to
              this website or the content or the services thereof.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              The user expressly agrees that the use of this website is entirely at the user’s own
              risk and indemnifies SAEON against any third party claims that might arise out of the
              user’s use of this website or any other website linked to this website.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              This website and its contents are provided on an “as is” and “as available” basis and
              has not been compiled or supplied to meet the user’s individual requirements.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Governing Law
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              The South African law and the jurisdiction of the South African courts shall govern
              any action in terms of the use or inability to use this website.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              How to contact us
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Should you have other questions or concerns about these privacy policies, please call
              us on +27 (12) 534 3504 or send us an email at enquiries@saeon.ac.za.
            </Typography>
          </CardContent>
        </Card>
      </FlatPage>
      <Footer />
    </>
  )
}
