import React, { useState } from "react";
import {
	Card,
	CountdownTimer,
	SectionGroup,
	Grid,
	Cell,
	DateWidget,
	PalaceIcon,
} from "@components";
import Auth from "@app/Auth";
import UseText from "@app/UseText";

function GeneralInfo(props) {
	const userInfo = Auth.userData();

	return (
		<section name="general-info">
			<Grid type="x">
				<Cell>
					<Card className="hide-for-large">
						<SectionGroup className="countdown">
							<p className="title-2">
								<DateWidget value={userInfo.wedding_date} />
							</p>
							<CountdownTimer
								message="Congratulations!!!"
								date={userInfo.wedding_date}
							/>
							<br/>
						</SectionGroup>
					</Card>
					<Card className="section-information-weddings">
						<Grid type="x" className="align-top">
							<Cell small="3" medium="3" large="3" className="text-center">
								<SectionGroup>
									<PalaceIcon
										name="rose"
										className="pr-2x"
									/>
									<p className="subtitle-3">Symbolic Ceremony</p>
								</SectionGroup>
							</Cell>
							<Cell small="3" medium="3" large="3" className="text-center">
								<SectionGroup>
									<PalaceIcon
										name="hotel"
										className="pr-2x"
									/>
									<p className="subtitle-3">{userInfo.resort}</p>
								</SectionGroup>
							</Cell>
							<Cell small="3" medium="3" large="3" className="text-center">
								<SectionGroup>
									<PalaceIcon
										name="plane-arrival"
										className="pr-2x"
									/>
									<p className="subtitle-3">
										<UseText i18n="ARRIVAL" /> <br />
										<DateWidget value={userInfo.date_start} />
									</p>
								</SectionGroup>
							</Cell>
							<Cell small="3" medium="3" large="3" className="text-center">
								<SectionGroup>
									<PalaceIcon
										name="plane-departure"
										className="pr-2x"
									/>
									<p className="subtitle-3">
										<UseText i18n="DEPARTURE" /> <br />
										<DateWidget value={userInfo.date_end} />
									</p>
								</SectionGroup>
							</Cell>
						</Grid>
					</Card>
				</Cell>
			</Grid>
		</section>
	);
}

export default GeneralInfo;
