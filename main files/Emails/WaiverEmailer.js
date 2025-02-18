function sendWaiverEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Class List').getDataRange().getValues();
  
  for (var i = 3; i < sheet.length; i++) {
    var parentWaiverAccepted = sheet[i][2];
    var parentWaiverEmail = sheet[i][17];
    var parentWaiverName = sheet[i][12]
    
    if (parentWaiverEmail == ``) {
      Logger.log(`No Email`);
    } else {

      if (!parentWaiverAccepted == ``) {
        var emailAddress = parentWaiverEmail;
        var subject = 'Emler Swim School Policies Not Yet Accepted';
        var message = `<div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
								<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
									<tbody>
										<tr>
											<td style="vertical-align:middle;padding:0px;">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
													<tbody>
														<tr>
															<td align="center" style="background:#36ccf2;font-size:0px;padding:20px;word-break:break-word;">
																<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
																	<tbody>
																		<tr>
																			<td style="width:150px;"><img alt="Logo" height="auto" src="https://emlerswimschool.com/wp-content/themes/Emler2018/library/images/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;" width="150"></td>
																		</tr>
																	</tbody>
																</table>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
<p>Hello ${parentWaiverName},</p>
<p>You are receiving this email because you have not yet accepted our policies.<br /> This is done through our parent portal:
      <form action="https://app.iclasspro.com/portal/emlerdallas/" method="get" target="_blank">
         <button type="submit">Portal</button>
      </form>
</p>
<p>This is required for all families swimming with us. Please accept our policies at your earliest convenience</p>
<p>We already have an account for all students swimming with us. Your account is under the email: ${parentWaiverEmail} <br /> <br />
If you don't recall making an account then you will need to reset your password first.
<br /><small>If you need any help with this then feel free to give us a call or find me at the front desk</small></p>
<p>Swimcerely,<br /> Preston-Forest Location <br /><small><strong>Emler Swim School</strong></small> </p>
<p><small>Phone: (469) 847-9401 </small></p>`;

        // create an HTML template
        var template = HtmlService.createHtmlOutput(message);

        MailApp.sendEmail({
          to: emailAddress,
          subject: subject,
          htmlBody: template.getContent()
        });
        Logger.log('Reminder email sent to ' + emailAddress);
      } else {
        Logger.log('Date in column C is not in the future');
      }
    }
  }
}
