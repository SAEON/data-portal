import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Link from '@mui/material/Link'
import FlatPage, { H, P } from '../../components/flat-page'
import { alpha } from '@mui/material/styles'

export default () => {
  return (
    <>
      <FlatPage>
        <Card
          sx={theme => ({
            backgroundColor: alpha(theme.palette.common.white, 0.9),
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4)
          })}
          variant="outlined"
        >
          <CardHeader style={{ textAlign: 'center' }} title="Privacy Policy" />

          <CardContent>
            <H>Our commitment to privacy</H>

            <P>
              Your privacy is important to us. To better protect your privacy we provide this notice
              explaining our online information practices. If you have additional questions or
              require more information about our Privacy Policy, do not hesitate to contact us.
            </P>

            <P>We do not share information that we collect with outside parties.</P>

            <P>
              Finally, we never use or share the personally identifiable information provided to us
              online in ways unrelated to the ones described.
            </P>

            <H>Log Files</H>

            <P>
              SAEON Data Portal follows a standard procedure of using log files. These files log
              visitors when they visit websites. All websites do this. The information collected by
              log files include internet protocol (IP) addresses, browser type, Internet Service
              Provider (ISP), date and time stamp, referring/exit pages, and page usage information
              (clicks and mouse tracking). These are not linked to any information that is
              personally identifiable. The purpose of the information is for analysing trends,
              administering the site, tracking users&apos; movement on the website, and gathering
              demographic information.
            </P>

            <H>Cookies and Web Beacons</H>

            <P>
              Like any other website, SAEON Data Portal uses &apos;cookies&apos;. These cookies are
              used to store information including visitors&apos; preferences, and the pages on the
              website that the visitor accessed or visited. The information is used to optimize the
              users&apos; experience by customizing our web page content based on visitors&apos;
              browser type and/or other information.
            </P>

            <P>
              For more general information on cookies, please read the &quot;What Are Cookies&quot;
              article on{' '}
              <Link href="https://www.cookieconsent.com/what-are-cookies/">
                Cookie Consent website
              </Link>
              .
            </P>

            <H>Personal information we collect</H>

            <P>
              Personal information is collected insofar as it is necessary to identify and
              authenticate users, only when users authenticate with the ODP. Such information is
              limited to profile information from services that this software uses for
              authentication purposes (Google, Twitter, etc.) and email addresses used for
              identification (and no other) purposes.
            </P>

            <H>Third Party Privacy Policies</H>

            <P>
              SAEON Data Portal&apos;s Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective Privacy Policies of
              these third-party websites or ad servers for more detailed information. It may include
              their practices and instructions about how to opt-out of certain options.
            </P>

            <P>
              You can choose to disable cookies through your individual browser options. To know
              more detailed information about cookie management with specific web browsers, it can
              be found at the browsers&apos; respective websites. Note that disabling cookies will
              prevent the SAEON Data Portal from functioning fully.
            </P>

            <H>Children&apos;s Information</H>

            <P>
              Another part of our priority is adding protection for children while using the
              internet. We encourage parents and guardians to observe, participate in, and/or
              monitor and guide their online activity.
            </P>

            <P>
              SAEON Data Portal does not knowingly collect any Personal Identifiable Information
              from children under the age of 13. If you think that your child provided this kind of
              information on our website, we strongly encourage you to contact us immediately and we
              will do our best efforts to promptly remove such information from our records.
            </P>

            <H>Our commitment to data security</H>

            <P>
              To prevent unauthorised access, maintain data accuracy, and ensure the correct use of
              information, we have put in place appropriate physical, electronic, and managerial
              procedures to safeguard and secure the information we collect online.
            </P>

            <H>Online Privacy Policy Only</H>

            <P>
              This Privacy Policy applies only to our online activities and is valid for visitors to
              our website with regards to the information that they shared and/or collect in SAEON
              Data Portal. This policy is not applicable to any information collected offline or via
              channels other than this website.
            </P>

            <H>Consent</H>

            <P>
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms
              and Conditions.
            </P>

            <H>How to contact us</H>

            <P>
              Should you have other questions or concerns about these privacy policies, please call
              us on +27 (12) 534 3504 or send us an email at enquiries@saeon.ac.za.
            </P>
          </CardContent>
        </Card>
      </FlatPage>
    </>
  )
}
