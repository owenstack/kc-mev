import { Page } from "@/components/Page";
import { List, Section } from "@telegram-apps/telegram-ui";

export function HomePage() {
	return (
		<Page back={false}>
			<List>
				<Section>
					Something sha
					<p>Additional content goes here.</p>
					<p>More content can be added here.</p>
				</Section>
			</List>
		</Page>
	);
}
