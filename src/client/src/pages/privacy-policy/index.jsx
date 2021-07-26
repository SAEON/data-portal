import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
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
          <CardHeader style={{ textAlign: 'center' }} title="Privacy Policy" />

          <CardContent>
            <Typography className={clsx(classes.h2)} variant="h6">
              Our commitment to privacy
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Your privacy is important to us. To better protect your privacy we provide this notice
              explaining our online information practices. If you have additional questions or
              require more information about our Privacy Policy, do not hesitate to contact us.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              We do not share information that we collect with outside parties.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Finally, we never use or share the personally identifiable information provided to us
              online in ways unrelated to the ones described.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Log Files
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON Data Portal follows a standard procedure of using log files. These files log
              visitors when they visit websites. All websites do this. The information collected by
              log files include internet protocol (IP) addresses, browser type, Internet Service
              Provider (ISP), date and time stamp, referring/exit pages, and page usage information
              (clicks and mouse tracking). These are not linked to any information that is
              personally identifiable. The purpose of the information is for analysing trends,
              administering the site, tracking users&apos; movement on the website, and gathering
              demographic information.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Cookies and Web Beacons
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Like any other website, SAEON Data Portal uses &apos;cookies&apos;. These cookies are
              used to store information including visitors&apos; preferences, and the pages on the
              website that the visitor accessed or visited. The information is used to optimize the
              users&apos; experience by customizing our web page content based on visitors&apos;
              browser type and/or other information.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              For more general information on cookies, please read the &quot;What Are Cookies&quot;
              article on{' '}
              <Link href="https://www.cookieconsent.com/what-are-cookies/">
                Cookie Consent website
              </Link>
              .
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Personal information we collect
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Personal information is collected insofar as it is necessary to identify and
              authenticate users, only when users authenticate with the ODP. Such information is
              limited to profile information from services that this software uses for
              authentication purposes (Google, Twitter, etc.) and email addresses used for
              identification (and no other) purposes.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Third Party Privacy Policies
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON Data Portal&apos;s Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective Privacy Policies of
              these third-party websites or ad servers for more detailed information. It may include
              their practices and instructions about how to opt-out of certain options.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              You can choose to disable cookies through your individual browser options. To know
              more detailed information about cookie management with specific web browsers, it can
              be found at the browsers&apos; respective websites. Note that disabling cookies will
              prevent the SAEON Data Portal from functioning fully.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Children&apos;s Information
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              Another part of our priority is adding protection for children while using the
              internet. We encourage parents and guardians to observe, participate in, and/or
              monitor and guide their online activity.
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              SAEON Data Portal does not knowingly collect any Personal Identifiable Information
              from children under the age of 13. If you think that your child provided this kind of
              information on our website, we strongly encourage you to contact us immediately and we
              will do our best efforts to promptly remove such information from our records.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Our commitment to data security
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              To prevent unauthorised access, maintain data accuracy, and ensure the correct use of
              information, we have put in place appropriate physical, electronic, and managerial
              procedures to safeguard and secure the information we collect online.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Online Privacy Policy Only
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              This Privacy Policy applies only to our online activities and is valid for visitors to
              our website with regards to the information that they shared and/or collect in SAEON
              Data Portal. This policy is not applicable to any information collected offline or via
              channels other than this website.
            </Typography>

            <Typography className={clsx(classes.h2)} variant="h6">
              Consent
            </Typography>

            <Typography className={clsx(classes.body)} variant="body2">
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms
              and Conditions.
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
